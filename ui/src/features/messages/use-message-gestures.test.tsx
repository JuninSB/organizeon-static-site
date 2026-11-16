import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useMessageGestures } from "./use-message-gestures";
let configuredDelay: number | undefined;
vi.mock("@/stores/messages-store",()=>({useMessagesState:()=>({inbox:{settings:{longPressMs:configuredDelay}}})}));
const event=(x=0,y=0)=>({pointerType:"touch",target:document.createElement("p"),clientX:x,clientY:y,stopPropagation:vi.fn()}) as any;
afterEach(()=>{vi.useRealTimers();configuredDelay=undefined;});
it("opens exactly at 200 ms and cancels when scrolling",()=>{
 vi.useFakeTimers();const actions=vi.fn();const {result}=renderHook(()=>useMessageGestures({reply:vi.fn(),actions}));
 act(()=>result.current.handlers.onPointerDown(event()));act(()=>vi.advanceTimersByTime(199));expect(actions).not.toHaveBeenCalled();act(()=>vi.advanceTimersByTime(1));expect(actions).toHaveBeenCalledOnce();
 act(()=>result.current.handlers.onPointerUp(event()));actions.mockClear();act(()=>result.current.handlers.onPointerDown(event()));act(()=>result.current.handlers.onPointerMove(event(0,20)));act(()=>vi.advanceTimersByTime(200));expect(actions).not.toHaveBeenCalled();
});
it("cancels touch-and-hold on release and unmount",()=>{
 vi.useFakeTimers();const actions=vi.fn();const {result,unmount}=renderHook(()=>useMessageGestures({reply:vi.fn(),actions}));act(()=>result.current.handlers.onPointerDown(event()));act(()=>vi.advanceTimersByTime(100));act(()=>result.current.handlers.onPointerUp(event()));act(()=>vi.advanceTimersByTime(200));expect(actions).not.toHaveBeenCalled();act(()=>result.current.handlers.onPointerDown(event()));unmount();act(()=>vi.advanceTimersByTime(200));expect(actions).not.toHaveBeenCalled();
});

it("uses the configured account delay instead of the default",()=>{configuredDelay=350;vi.useFakeTimers();const actions=vi.fn();const {result}=renderHook(()=>useMessageGestures({reply:vi.fn(),actions}));act(()=>result.current.handlers.onPointerDown(event()));act(()=>vi.advanceTimersByTime(349));expect(actions).not.toHaveBeenCalled();act(()=>vi.advanceTimersByTime(1));expect(actions).toHaveBeenCalledOnce();});
