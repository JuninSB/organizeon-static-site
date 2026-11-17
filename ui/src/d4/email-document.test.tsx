import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { emailDocument } from "./email-document";
import MessagePage from "./pages/message";
import { api } from "./api";
vi.mock("./api", () => ({ api: vi.fn(), date: (value: string) => value }));
const message = { id: "one", subject: "Teste", sender: "sender@example.org", recipients: [], folder: "inbox", created: "2026-11-17", body: "Texto alternativo", html: '<a href="https://example.org/verify">Verificar</a><img src="https://example.org/logo.png">', attachments: [] };
describe("email reader", () => {
  it("preserves HTTPS images and opens links outside the isolated document", () => {
    const doc = new DOMParser().parseFromString(emailDocument(message.html), "text/html");
    expect(doc.querySelector("img")?.src).toBe("https://example.org/logo.png");
    expect(doc.querySelector("a")?.target).toBe("_blank");
    expect(doc.querySelector("a")?.rel).toContain("noopener");
    expect(doc.querySelector('meta[http-equiv]')?.getAttribute("content")).toContain("img-src https: data:");
  });
  it("removes active content and unsafe navigation", () => {
    const doc = new DOMParser().parseFromString(emailDocument('<script>alert(1)</script><img src=x onerror="alert(1)"><a href="javascript:alert(1)">x</a><iframe src="https://example.org"></iframe><form action="/d4/api/login"></form>'), "text/html");
    expect(doc.querySelector("script,iframe,form,[onerror]")).toBeNull();
    expect(doc.querySelector("a")?.hasAttribute("href")).toBe(false);
  });
  it("automatically selects HTML and resets the selection between messages", async () => {
    vi.mocked(api).mockResolvedValueOnce(message).mockResolvedValueOnce({ ...message, id: "two", html: "", body: "Somente texto" });
    const view = render(<MessagePage id="one" refresh={async () => {}} />);
    const frame = await screen.findByTitle("Conteúdo do e-mail");
    expect(frame.getAttribute("sandbox")).toBe("allow-popups allow-popups-to-escape-sandbox");
    fireEvent.click(screen.getByRole("button", { name: "Ver texto" }));
    expect(screen.getByText("Texto alternativo")).toBeInTheDocument();
    view.rerender(<MessagePage id="two" refresh={async () => {}} />);
    await waitFor(() => expect(screen.getByText("Somente texto")).toBeInTheDocument());
    expect(screen.queryByTitle("Conteúdo do e-mail")).toBeNull();
  });
});
