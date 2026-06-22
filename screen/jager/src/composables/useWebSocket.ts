import { io, Socket } from "socket.io-client";
import { ref, onUnmounted } from "vue";

/**

* WebSocket配置项
  */
interface WebSocketOptions {
  // 是否自动连接
  autoConnect?: boolean;

  // 最大重连次数
  reconnectionAttempts?: number;

  // 重连间隔(ms)
  reconnectionDelay?: number;
}

/**

* 当前连接状态
  */
type WebSocketStatus =
  | "connecting" // 连接中
  | "connected" // 已连接
  | "disconnected" // 已断开
  | "reconnecting" // 重连中
  | "error"; // 连接异常

/**

* 事件回调
  */
type EventCallback<T = any> = (data: T) => void;

export default function useWebSocket(
  url: string,
  options: WebSocketOptions = {},
) {
  const {
    autoConnect = true,
    reconnectionAttempts = 5,
    reconnectionDelay = 3000,
  } = options;

  /**

* socket实例
  */
  const socket = ref<Socket | null>(null);

  /**

* 当前连接状态
  */
  const connectionStatus = ref<WebSocketStatus>("disconnected");

  /**

* 最近一次错误
  */
  const lastError = ref<Error | null>(null);

  /**

* 事件中心
*
* TrendsData
* -> cb1
* -> cb2
*
* MapData
* -> cb3
  */
  const eventCallbacks = new Map<string, Set<EventCallback>>();

  /**
   * 初始化Socket
   */
  const initSocket = () => {
    // 防止重复初始化
    if (socket.value) return;

    connectionStatus.value = "connecting";

    socket.value = io(url, {
      autoConnect,
      reconnectionAttempts,
      reconnectionDelay,
    });

    /**
     * 建立连接成功
     */
    socket.value.on("connect", () => {
      connectionStatus.value = "connected";
      lastError.value = null;
    });

    /**
     * 连接断开
     */
    socket.value.on("disconnect", () => {
      connectionStatus.value = "disconnected";
    });

    /**
     * 连接异常
     */
    socket.value.on("connect_error", (error) => {
      connectionStatus.value = "error";
      lastError.value = error;
    });

    /**
     * 自动重连中
     */
    socket.value.io.on("reconnect_attempt", () => {
      connectionStatus.value = "reconnecting";
    });

    /**
     * 监听服务端所有事件
     *
     * 服务端:
     * socket.emit("TrendsData", data)
     * socket.emit("MapData", data)
     *
     * 客户端:
     * 自动分发给对应订阅者
     */
    socket.value.onAny((eventName, data) => {
      const callbacks = eventCallbacks.get(eventName);

      if (!callbacks) return;

      callbacks.forEach((callback) => {
        callback(data);
      });
    });
  };

  /**

* 订阅事件
*
* subscribe("TrendsData", updateData)
  */
  const subscribe = <T>(eventName: string, callback: EventCallback<T>) => {
    if (!eventCallbacks.has(eventName)) {
      eventCallbacks.set(eventName, new Set());
    }

    eventCallbacks.get(eventName)?.add(callback);
  };

  /**

* 取消订阅
*
* unsubscribe("TrendsData", updateData)
  */
  const unsubscribe = (eventName: string, callback?: EventCallback) => {
    const callbacks = eventCallbacks.get(eventName);

    if (!callbacks) return;

    if (callback) {
      callbacks.delete(callback);

      if (callbacks.size === 0) {
        eventCallbacks.delete(eventName);
      }
    } else {
      eventCallbacks.delete(eventName);
    }
  };

  /**

* 向服务端发送消息
  */
  const emit = <T>(eventName: string, data?: T) => {
    socket.value?.emit(eventName, data);
  };

  /**

* 手动连接
  */
  const connect = () => {
    if (!socket.value) {
      initSocket();
    }

    connectionStatus.value = "connecting";

    socket.value?.connect();
  };

  /**

* 断开连接
  */
  const disconnect = () => {
    socket.value?.disconnect();
  };

  /**

* 销毁实例
  */
  const destroy = () => {
    socket.value?.removeAllListeners();
    socket.value?.disconnect();

    eventCallbacks.clear();

    socket.value = null;

    connectionStatus.value = "disconnected";
  };

  /**

* 组件卸载自动清理
  */
  onUnmounted(() => {
    destroy();
  });

  /**

* 自动连接
  */
  if (autoConnect) {
    initSocket();
  }

  return {
    socket,
    connectionStatus,
    lastError,

    subscribe,
    unsubscribe,

    emit,

    connect,
    disconnect,
    destroy,
  };
}
