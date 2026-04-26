import { render, screen, waitFor } from "@testing-library/react";
import App  from "./App";
import api from './services/api';


jest.mock("./services/api");
const mockedApi = api as jest.Mocked<typeof api>;
describe("App conponent test", () =>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  test("renders Task Manager Header and loading state", async()=>{
    mockedApi.get.mockResolvedValueOnce({data: []});
    render(<App />);

    //assert that the header text we created is visible
    const headerElement = screen.getByText(/Task Manager 📝/i);
    expect(headerElement).toBeInTheDocument();

    const loadingElement = screen.getByText(/Loading your tasks/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders seeded tasks after API call resolves ", async() =>{
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          _id:'123',
          title:'Test Task from Jest',
          isCompleted:false,
          createAt: new Date().toISOString()
        }
      ]
    });
    render(<App />);

    await waitFor(() =>{
      const taskElement = screen.getByText(/Test Task from Jest/i);
      expect(taskElement).toBeInTheDocument();
    });
  });
});