import mitt from 'mitt';
import type { EventBus } from '@/types/eventBus';
const emitter = mitt<EventBus>();
export default emitter;
