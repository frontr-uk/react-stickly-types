import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import { z } from "zod";
import { createPetClient, schemas } from "./sdk/generated-client";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dog />
    </QueryClientProvider>
  );
}

export default App;

type Pet = z.infer<typeof schemas.Pet>;
type Availability = "available" | "pending" | "sold";

function Dog() {
  const [status, setStatus] = useState<Availability>("available");
  const { data, isLoading } = useQuery(status, () => getData(status));

  return (
    <div>
      {data ? data.map((dog) => <p key={dog.id}>{dog.name}</p>) : "loading"}
    </div>
  );
}

const getData = async (status: Availability) => {
  const client = await createPetClient();
  const pets = await client.findPetsByStatus({ status });
  // const client = await createPetClient();
  // const pets = await client.findPetsByStatus({ status: "available" });
  return pets;
};
