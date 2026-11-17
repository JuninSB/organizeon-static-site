import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { senderIdentity } from "./sender";
import { SenderAvatar, SenderProfile } from "./sender-profile";

describe("sender identity", () => {
  it("parses names and exact domains without confusing lookalikes", () => {
    expect(senderIdentity('"Roblox" <no-reply@roblox.com>').name).toBe("Roblox");
    expect(senderIdentity('Roblox <no-reply@roblox.com>').logo).toBeTruthy();
    expect(senderIdentity('Roblox <no-reply@roblox.com.attacker.example>').logo).toBeUndefined();
    expect(senderIdentity('Alice Silva <alice@example.org>').initials).toBe("AS");
    expect(senderIdentity('person@example.org').address).toBe("person@example.org");
  });
  it("falls back to initials when the image cannot load", () => {
    const {container} = render(<SenderAvatar sender="Roblox <no-reply@roblox.com>" />);
    fireEvent.error(container.querySelector('img')!);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('R')).toBeInTheDocument();
  });
  it("opens a sender card with real address and copies it", async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:copy}});
    render(<SenderProfile sender="Alice Silva <alice@example.org>" messageId="one" />);
    fireEvent.click(screen.getByRole('button',{name:'Ver perfil de Alice Silva'}));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('alice@example.org')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button',{name:'Copiar endereço'}));
    expect(await screen.findByText('Endereço copiado.')).toBeInTheDocument();
    expect(copy).toHaveBeenCalledWith('alice@example.org');
    expect(screen.queryByText(/verificado/i)).toBeNull();
  });
});
