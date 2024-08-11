const request = require('supertest');
const express = require('express');
const empleadoRoutes = require('../src/routes/empleadoRoutes');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/empleados', empleadoRoutes);

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.empleado.deleteMany();
    await prisma.$disconnect();
});

describe('Empleado Controller', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ userId: 1, role: 'admin' }, process.env.JWT_SECRET || 'tu_secreto_jwt');
    });

    describe('GET /empleados', () => {
        it('should get all empleados', async () => {
            const res = await request(app)
                .get('/empleados')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    describe('POST /empleados', () => {
        it('should create a new empleado', async () => {
            const res = await request(app)
                .post('/empleados')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fechaIngreso: '2024-08-01',
                    nombre: 'Juan Pérez',
                    salario: 2500.50
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body.nombre).toBe('Juan Pérez');
        });
    });

    describe('PUT /empleados/:id', () => {
        it('should update an existing empleado', async () => {
            const empleado = await prisma.empleado.create({
                data: {
                    fechaIngreso: new Date(),
                    nombre: 'Empleado Original',
                    salario: 2000
                }
            });

            const res = await request(app)
                .put(`/empleados/${empleado.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nombre: 'Empleado Actualizado',
                    salario: 2200
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.nombre).toBe('Empleado Actualizado');
            expect(res.body.salario).toBe(2200);
        });
    });

    describe('DELETE /empleados/:id', () => {
        it('should delete an existing empleado', async () => {
            const empleado = await prisma.empleado.create({
                data: {
                    fechaIngreso: new Date(),
                    nombre: 'Empleado a Eliminar',
                    salario: 1800
                }
            });

            const res = await request(app)
                .delete(`/empleados/${empleado.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Empleado eliminado');

            const deletedEmpleado = await prisma.empleado.findUnique({
                where: { id: empleado.id }
            });
            expect(deletedEmpleado).toBeNull();
        });
    });
});