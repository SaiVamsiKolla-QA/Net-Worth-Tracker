/**
 * Jest setup file
 * Runs before all tests
 */

// Mock localStorage for tests
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  
  global.localStorage = localStorageMock as any;
  
  // Mock console methods to reduce noise in tests
  global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
  };
  
  // Reset mocks before each test
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });