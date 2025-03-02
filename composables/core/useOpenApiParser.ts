// Given an openapi url it returns a typed document representation of the specs

import Oas from 'oas';
import {useFetch} from '#app';
import type {HttpMethods, TagObject} from 'oas/types';
import type {Endpoint, RefComponentMap} from '~/core/core/ApiFormats.js'
import {ParserUtility} from '~/core/utilities/ParserUtils';
import {OpenAPIV3, OpenAPIV3_1} from "openapi-types";
import ArraySchemaObject = OpenAPIV3_1.ArraySchemaObject;
import NonArraySchemaObject = OpenAPIV3.NonArraySchemaObject;
import MixedSchemaObject = OpenAPIV3_1.MixedSchemaObject;

let api2 = "https://petstore3.swagger.io/api/v3/openapi.json"
let api = "https://ajebeta.azurewebsites.net/swagger/v1/swagger.json"
let api8 = "https://livingdocsio.github.io/openapi/livingdocs-openapi.json"

let spec: Oas;

async function InitialiseOpenApiParser(openApiSpec: string): Promise<Oas|null> {
    const {data, error, refresh} = await useFetch<string>(openApiSpec)
    if (error.value) {
        console.log(error.value);
        return null
    }
    spec = new Oas(data?.value as string)
    await spec.dereference()
    return spec
}

export const getOpenApiPaths = async (apiJson: string): Promise<Array<Endpoint>> => {
    let endpointModels = ref(Array<Endpoint>())

    let spec = await InitialiseOpenApiParser(api2)

    if(spec === null) {
        return endpointModels.value
    }

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
                Summary: operation.getSummary(),
                ResponseExample: operation.getResponseByStatusCode(200)
            } as Endpoint

            endpointModels.value.push(endpointModel)
        })
    });

    return endpointModels.value

}

export const getOpenApiComponents = async (apiJson: string): Promise<RefComponentMap> => {
    let response: RefComponentMap = {}
    type Shema =  Record<string, ArraySchemaObject | NonArraySchemaObject | MixedSchemaObject> | undefined

    if(spec === null) {
        return {}
    }

    let schemaKeys = spec.api.components?.schemas as Shema
    let keys = Object.keys(schemaKeys)

    keys.forEach(key => {
        let value = schemaKeys[key];

        if(value.type === 'object') {
            let temp = {}
            let kv = Object.entries(value.properties)

        }
        response[key] = schemaKeys[key]
    })

    return response
}