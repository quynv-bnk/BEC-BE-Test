const request = require('supertest');

describe('Auth middleware ▶ POST /api/auth/login', () => {
  let server;

  beforeEach(() => { server = require('../../src/App'); })
  afterEach(() => {
    server.close();
  });

  const exec = ({ email, password }) => {
    return request(server)
      .post('/api/auth/login')
      .type('form')
      .send({ email, password })
      .set('content-type', 'application/json')
  }

  it('should return 200 - { token: "abc@123" }', async () => {
    const res = await exec({ email: 'admin@admin.com', password: 'password' });
    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty('token');
  });

  it('should return 400 - "Invalid username or password"', async () => {
    const res = await exec({ email: 'something@gmail.com', password: 'password' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Invalid Email or Password');
  });
});

describe('▶ GET /api/handledRejection', () => {
  let server;

  beforeEach(() => { server = require('../../src/App'); })
  afterEach(() => {
    server.close();
  });

  const exec = () => {
    return request(server)
      .get('/api/handledRejection')
  }

  it('should return 400 - { error: "This is Handled Rejection." }', async () => {
    const res = await exec();
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Handled Rejection.');
  });
});

describe('▶ GET /api/unhandledRejection', () => {
  let server;

  beforeEach(() => { server = require('../../src/App'); })
  afterEach(() => {
    server.close();
  });

  const exec = () => {
    return request(server)
      .get('/api/unhandledRejection')
  }

  it('should return 500', async () => {
    const res = await exec();
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Internal Server Error');
  });
});