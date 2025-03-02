import type { Operation, Webhook } from "oas/operation"
import type { HttpMethods, ParameterObject } from "oas/types"

export interface Endpoint {
    Url: string,
    Description: string | undefined,
    IsNew: boolean
    Method: HttpMethods,
    Tag: string,
    Summary: string,
    Parameters: Array<Parameter>,
    Body: any,
    OperationId: string,
    RequestBodyMediaTypes: string[],
    ResponseStatusCodes: string[],
    ResponseExample: any

}

export interface Parameter {
    Type: number | string | object | boolean
    Name: string,
    default: string,
    In: string,
    Description: string | undefined,
    IsRequired: boolean,
    Example: string | undefined,
    Value: any | undefined
}

export interface RefComponent {

}

export type RefComponentMap = Record<string, RefComponent>
