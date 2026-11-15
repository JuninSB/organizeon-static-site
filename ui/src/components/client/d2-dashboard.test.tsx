import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { D2Dashboard } from "./d2-dashboard";

it("loads files and saves a new text through the existing file API", async () => {
  const user = userEvent.setup();
  const request = vi.fn(async (path: string, options?: RequestInit) => path === "/files" && !options ? { files: [] } : {});
  render(<D2Dashboard username="Ana" role="admin" request={request} upload={vi.fn()} logout={vi.fn()} />);
  expect(await screen.findByText("Nenhum arquivo ainda.")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Novo texto" }));
  await user.type(screen.getByLabelText("Conteúdo"), "conteúdo");
  await user.click(screen.getByRole("button", { name: "Salvar texto" }));
  expect(request).toHaveBeenCalledWith("/files", expect.objectContaining({ method: "POST", body: "conteúdo", headers: expect.objectContaining({ "X-File-Name": "script.txt" }) }));
  expect(await screen.findByText("Texto salvo.")).toBeInTheDocument();
});
