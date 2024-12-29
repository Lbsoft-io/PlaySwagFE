<template>
  <v-card variant="outlined" class="mt-2 my-1">
    <v-card-title class="text-caption mb-2">Request Parameters</v-card-title>

    <v-card-text>
      <template v-for="param in params" :key="param.Name">
        <v-sheet class="">
          <div class="d-flex justify-end text-caption text-light-red">
            <v-chip color="grey" density="compact" rounded="1" variant="text">
              {{param.Type.type}} {{param.IsRequired ? 'required' : 'optional'}}
            </v-chip>

          </div>
<!--          {{param}}-->
          <v-select
              v-if="param.Type.enum"
              v-model="param.Value"
              :="PropsBinder(param)"
              :items="param.Type.enum"
              v-tooltip="param.Description"
              flat
              variant="outlined"
              :placeholder="param.Type.example"
          >
          </v-select>

          <v-text-field
              v-if="param.Type.type === 'integer'"
              v-model="param.Value"
              :="PropsBinder(param)"
              class="elevation-0"
              density="compact"
              flat
              type="number"
              :placeholder="param.Type.example"
              variant="outlined">
            <v-tooltip
                activator="parent"
                location="start"
                max-width="200"
            >{{param.Description}}</v-tooltip>
          </v-text-field>

          <v-text-field
              v-if="param.Type.type === 'string'"
              v-model="param.Value"
              :="PropsBinder(param)"
              class="elevation-0"
              density="compact"
              flat
              :placeholder="param.Type.example"
              variant="outlined">
            <v-tooltip
                activator="parent"
                location="start"
                max-width="200"
            >{{param.Description}}</v-tooltip>
          </v-text-field>

          <v-switch
              v-if="param.Type.type === 'boolean'"
              v-model="param.Value"
              :="PropsBinder(param)"
              variant="outlined"
              :placeholder="param.Type.example"
          >
          </v-switch>
        </v-sheet>
      </template>
    </v-card-text>

  </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {Parameter} from "~/core/core/ApiFormats";

var props = defineProps({
  params: {
    type: Array<Parameter>,
    required: true,
  }
})

interface ControlProps {
  label: String;
  items: any[];
}

function PropsBinder(data: any): ControlProps {
  let prop = {} as ControlProps
  prop.label = '' + data.In + ' [' + data.Name + ']'
  prop.items = data.Type.enum
  return prop
}

//let rxParams = ref(props.params)
</script>
