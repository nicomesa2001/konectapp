const request = require('supertest');
const express = require('express');
const solicitudRoutes = require('../src/routes/solicitudRoutes');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/solicitudes', solicitudRoutes);

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.solicitud.deleteMany();
    await prisma.empleado.deleteMany();
    await prisma.$disconnect();
});

describe('Solicitud Controller', () => {
    let token;
    let empleadoId;

    beforeAll(async () => {
        token = jwt.sign({ userId: 1, role: 'admin' }, process.env.JWT_SECRET || 'tu_secreto_jwt');
        const empleado = await prisma.empleado.create({
            data: {
                fechaIngreso: new Date(),
                nombre: 'Empleado Test',
                salario: 2000
            }
        });
        empleadoId = empleado.id;
    });

    describe('GET /solicitudes', () => {
        it('should get all solicitudes', async () => {
            const res = await request(app)
                .get('/solicitudes')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    describe('POST /solicitudes', () => {
        it('should create a new solicitud', async () => {
            const res = await request(app)
                .post('/solicitudes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    codigo: 'SOL001',
                    descripcion: 'Solicitud de prueba',
                    resumen: 'Resumen de prueba',
                    empleadoId: empleadoId
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body.codigo).toBe('SOL001');
        });
    });

    describe('PUT /solicitudes/:id', () => {
        it('should update an existing solicitud', async () => {
            const solicitud = await prisma.solicitud.create({
                data: {
                    codigo: 'SOL002',
                    descripcion: 'Solicitud original',
                    resumen: 'Resumen original',
                    empleadoId: empleadoId
                }
            });

            const res = await request(app)
                .put(`/solicitudes/${solicitud.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    descripcion: 'Solicitud actualizada',
                    resumen: 'Resumen actualizado'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.descripcion).toBe('Solicitud actualizada');
            expect(res.body.resumen).toBe('Resumen actualizado');
        });
    });

    describe('DELETE /solicitudes/:id', () => {
        it('should delete an existing solicitud', async () => {
            const solicitud = await prisma.solicitud.create({
                data: {
                    codigo: 'SOL003',
                    descripcion: 'Solicitud a eliminar',
                    resumen: 'Resumen a eliminar',
                    empleadoId: empleadoId
                }
            });

            const res = await request(app)
                .delete(`/solicitudes/${solicitud.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Solicitud eliminada');

            const deletedSolicitud = await prisma.solicitud.findUnique({
                where: { id: solicitud.id }
            });
            expect(deletedSolicitud).toBeNull();
        });
    });
});