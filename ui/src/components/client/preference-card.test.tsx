import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PreferenceCard } from "./preference-card";

describe("PreferenceCard", () => {
  it("enables apply only after a changed value and sends the selection", async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    render(<PreferenceCard
      title="Browser identity"
      description="Choose how sites identify the browser."
      label="Browser identity"
      value="firefox"
      options={[{ value: "firefox", label: "Firefox" }, { value: "edge", label: "Microsoft Edge" }]}
      onApply={onApply}
    />);

    const apply = screen.getByRole("button", { name: "Aplicar" });
    expect(apply).toBeDisabled();
    await user.click(screen.getByRole("combobox", { name: "Browser identity" }));
    await user.click(await screen.findByRole("option", { name: "Microsoft Edge" }));
    expect(apply).toBeEnabled();
    await user.click(apply);
    expect(onApply).toHaveBeenCalledWith("edge");
  });
});
