import { render, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, it, expect, vi } from "vitest";
import { useHoldMenu } from "./use-hold-menu";
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
it("holding opens once, suppresses click, keeps ordinary clicks and keyboard navigation", () => {
  vi.useFakeTimers();
  const open = vi.fn(),
    click = vi.fn();
  function Row() {
    return (
      <button {...useHoldMenu(open)} onClick={click}>
        Mail
      </button>
    );
  }
  const { getByRole } = render(<Row />);
  const row = getByRole("button");
  fireEvent.pointerDown(row, { button: 0, clientX: 20, clientY: 20 });
  vi.advanceTimersByTime(210);
  fireEvent.pointerUp(row);
  fireEvent.click(row);
  expect(open).toHaveBeenCalledOnce();
  expect(click).not.toHaveBeenCalled();
  fireEvent.pointerDown(row, { button: 0 });
  fireEvent.pointerUp(row);
  fireEvent.click(row);
  expect(click).toHaveBeenCalledOnce();
  fireEvent.keyDown(row, { key: "F10", shiftKey: true });
  expect(open).toHaveBeenCalledTimes(2);
});
