import type { ParameterObject, SchemaObject } from "oas/types";
import type { Parameter } from "../core/ApiFormats";

export class ParserUtility {
    static ParseParameters(parameters: ParameterObject[]): Array<Parameter> {
        let list = new Array<Parameter>()

        parameters.forEach(params => {
            let p = {
                Name: params.name,
                Type: (params.schema as SchemaObject),
                In: params.in
            } as Parameter
            list.push(p)
        })

        return list;
    }
}