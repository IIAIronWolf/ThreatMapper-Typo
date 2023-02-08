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
import type { ModelNodeIdentifier } from './ModelNodeIdentifier';
import {
    ModelNodeIdentifierFromJSON,
    ModelNodeIdentifierFromJSONTyped,
    ModelNodeIdentifierToJSON,
} from './ModelNodeIdentifier';
import type { ModelScanFilter } from './ModelScanFilter';
import {
    ModelScanFilterFromJSON,
    ModelScanFilterFromJSONTyped,
    ModelScanFilterToJSON,
} from './ModelScanFilter';

/**
 * 
 * @export
 * @interface ModelComplianceScanTriggerReq
 */
export interface ModelComplianceScanTriggerReq {
    /**
     * 
     * @type {ModelScanFilter}
     * @memberof ModelComplianceScanTriggerReq
     */
    filters: ModelScanFilter;
    /**
     * 
     * @type {Array<ModelNodeIdentifier>}
     * @memberof ModelComplianceScanTriggerReq
     */
    node_ids: Array<ModelNodeIdentifier> | null;
}

/**
 * Check if a given object implements the ModelComplianceScanTriggerReq interface.
 */
export function instanceOfModelComplianceScanTriggerReq(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "filters" in value;
    isInstance = isInstance && "node_ids" in value;

    return isInstance;
}

export function ModelComplianceScanTriggerReqFromJSON(json: any): ModelComplianceScanTriggerReq {
    return ModelComplianceScanTriggerReqFromJSONTyped(json, false);
}

export function ModelComplianceScanTriggerReqFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelComplianceScanTriggerReq {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filters': ModelScanFilterFromJSON(json['filters']),
        'node_ids': (json['node_ids'] === null ? null : (json['node_ids'] as Array<any>).map(ModelNodeIdentifierFromJSON)),
    };
}

export function ModelComplianceScanTriggerReqToJSON(value?: ModelComplianceScanTriggerReq | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filters': ModelScanFilterToJSON(value.filters),
        'node_ids': (value.node_ids === null ? null : (value.node_ids as Array<any>).map(ModelNodeIdentifierToJSON)),
    };
}

