/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ReportersOrderFilter
 */
export interface ReportersOrderFilter {
    /**
     * 
     * @type {string}
     * @memberof ReportersOrderFilter
     */
    order_field: string;
}

/**
 * Check if a given object implements the ReportersOrderFilter interface.
 */
export function instanceOfReportersOrderFilter(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "order_field" in value;

    return isInstance;
}

export function ReportersOrderFilterFromJSON(json: any): ReportersOrderFilter {
    return ReportersOrderFilterFromJSONTyped(json, false);
}

export function ReportersOrderFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReportersOrderFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'order_field': json['order_field'],
    };
}

export function ReportersOrderFilterToJSON(value?: ReportersOrderFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'order_field': value.order_field,
    };
}
