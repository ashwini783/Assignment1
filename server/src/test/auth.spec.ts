import request from 'supertest';
import app from '../index'; // Your Express app


const testUser = {
  email: `testuser${Date.now()}@gmail.com`,
  password: 'India@123#',
};

describe('Auth API', () => {
  beforeAll(async () => {
    // Setup steps before tests run (like connecting to DB if necessary)
  });
;

  // Test the signup endpoint
  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/api/v1/user/signup')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
  
    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('message', 'User SignUp Successfully!');
  });

  // Test the login endpoint
  it('should log in an existing user', async () => {
    await request(app)
      .post('/api/v1/user/signup')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    const response = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    console.log('res body ',response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User Login Successfully!');
    expect(response.body.data).toHaveProperty('accessToken')
    expect(response.body.data).toHaveProperty('refreshToken')
  });

  // Test the logout endpoint
  it('should log out a user', async () => {
    const response = await request(app)
      .post('/api/v1/user/logout')
      .send({
        email: testUser.email
      })
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User Logged Off Successfully!');
  });
})