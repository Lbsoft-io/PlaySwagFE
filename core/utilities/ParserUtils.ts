import type { ParameterObject, SchemaObject } from "oas/types";
import type { Parameter } from "../core/ApiFormats";

export class ParserUtility {
    static ParseParameters(parameters: ParameterObject[]): Array<Parameter> {
        let list = new Array<Parameter>()

        parameters.forEach(params => {
            let p = {
                Name: params.name,
                Type: (params.schema as SchemaObject),
                In: params.in,
                Description: params.description,
                IsRequired: params.required,
                Example: params.example,
                Value: params.example ?? (params.schema as SchemaObject).example
            } as Parameter
            list.push(p)
        })

        return list;
    }
}