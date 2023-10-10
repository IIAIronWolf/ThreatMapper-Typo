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
 * @interface ModelTopologyDeltaReq
 */
export interface ModelTopologyDeltaReq {
    /**
     * 
     * @type {boolean}
     * @memberof ModelTopologyDeltaReq
     */
    addition: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ModelTopologyDeltaReq
     */
    deletion: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelTopologyDeltaReq
     */
    entity_types: Array<string> | null;
    /**
     * 
     * @type {number}
     * @memberof ModelTopologyDeltaReq
     */
    timestamp: number;
}

/**
 * Check if a given object implements the ModelTopologyDeltaReq interface.
 */
export function instanceOfModelTopologyDeltaReq(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "addition" in value;
    isInstance = isInstance && "deletion" in value;
    isInstance = isInstance && "entity_types" in value;
    isInstance = isInstance && "timestamp" in value;

    return isInstance;
}

export function ModelTopologyDeltaReqFromJSON(json: any): ModelTopologyDeltaReq {
    return ModelTopologyDeltaReqFromJSONTyped(json, false);
}

export function ModelTopologyDeltaReqFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelTopologyDeltaReq {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'addition': json['addition'],
        'deletion': json['deletion'],
        'entity_types': json['entity_types'],
        'timestamp': json['timestamp'],
    };
}

export function ModelTopologyDeltaReqToJSON(value?: ModelTopologyDeltaReq | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'addition': value.addition,
        'deletion': value.deletion,
        'entity_types': value.entity_types,
        'timestamp': value.timestamp,
    };
}
