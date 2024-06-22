// Given an openapi url it returns a typed document representation of the specs

import Oas from 'oas';
import { useFetch } from '#app';
import type { HttpMethods, MediaTypeObject, ResponseObject, SchemaObject, TagObject } from 'oas/types';
import type { Endpoint } from '~/core/core/ApiFormats.js'
import { ParserUtility } from '~/core/utilities/ParserUtils';

let api = "https://petstore3.swagger.io/api/v3/openapi.json"
let api2 = "https://ajebeta.azurewebsites.net/swagger/v1/swagger.json"

export const useUseOpenApiParser = async (apiJson: string): Promise<Array<Endpoint>> => {
  let endpointModels = ref(Array<Endpoint>())

  const { data, error, refresh } = await useFetch<string>(api2)

  if (error.value) {
    console.log(error.value);
    return endpointModels.value
  }

  let spec = new Oas(data?.value as string)

  spec.dereference()

  let paths = spec.getPaths();
  let pathKeys = Object.keys(paths)

  pathKeys.forEach(pathKey => {
    let endpoint = paths[pathKey]
    let methods = Object.keys(endpoint)

    methods.forEach(method => {
      let operation = endpoint[method as HttpMethods]

      operation.getParametersAsJSONSchema()

      let endpointModel = {
        OperationId: operation.getOperationId(),
        Url: operation.path,
        Description: operation.getDescription(),
        IsNew: true,
        Method: operation.method,
        Tag: (operation.getTags().at(0) as TagObject).name,
        Parameters: ParserUtility.ParseParameters(operation.getParameters()),
        Body: operation.getRequestBody(),
        RequestBodyMediaTypes: operation.getRequestBodyMediaTypes(),
        ResponseStatusCodes: operation.getResponseStatusCodes(),
        Summary: operation.getSummary()

      } as Endpoint

      endpointModels.value.push(endpointModel)
    })
  });

  return endpointModels.value

}