const request = require('supertest');
const express = require('express');
const authRoutes = require('../src/routes/authRoutes');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

describe('Auth Controller', () => {
    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    role: 'empleado'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toBe('test@example.com');
            expect(res.body.role).toBe('empleado');
        });
    });

    describe('POST /auth/login', () => {
        it('should login an existing user', async () => {
            await prisma.user.create({
                data: {
                    email: 'login@example.com',
                    password: await bcrypt.hash('password123', 10),
                    role: 'empleado'
                }
            });

            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 400 for invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Credenciales inválidas');
        });
    });
});