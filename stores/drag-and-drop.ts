import {useVueFlow} from '@vue-flow/core'
import {ref, watch} from 'vue'
import {defineStore} from 'pinia'
import type {Node} from '@vue-flow/core'

const {screenToFlowCoordinate, project, addNodes} = useVueFlow({
    id: 'vue-store'
})

export const useDragAndDrop = defineStore(
    {
        id: 'drag-and-drop',
        state: () => ({
            isDragging: false,
        }),
        actions: {
            handleDrop(dragEvent: DragEvent, nodes: Node[]) {
                dragEvent.preventDefault();
                const data = dragEvent.dataTransfer?.getData("payload"); // Get dropped data
                const position = project({
                    x: dragEvent.clientX,
                    y: dragEvent.clientY,
                })
                const newNode = {
                    id: `${Date.now()}`,
                    position,
                    data: {label: data || "Dropped Node"},
                    type: 'endpoint-node'
                } as Node;
                addNodes(newNode)
                this.isDragging = false;
            },
            dragStart(dragEvent: DragEvent, Id: string) {
                this.isDragging = true;
                dragEvent.dataTransfer?.setData("payload", Id);

            }
        }
    }
)