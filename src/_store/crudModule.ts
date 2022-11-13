import {Action, Mutation, VuexModule} from "vuex-module-decorators";
import Entity from "@/_models/Entity";
import CrudService from "@/_services/crud.service";

export default class CrudModule<T extends Entity> extends VuexModule {
    public elements: T[] = [];

    @Mutation
    public setElements(elements: T[]): void {
        this.elements = elements;
    }

    @Mutation
    public addElement(element: T): void {
        this.elements.push(element);
    }

    @Mutation
    public removeElement(id: string): void {
        this.elements = this.elements.filter(element => element.id !== id);
    }

    @Action
    public async retrieveAll(route: string): Promise<void> {
        const elements = await CrudService.retrieveAll<T>(route);
        this.context.commit('setElements', elements);
    }

    @Action
    public async create(params: { element: T, route: string }): Promise<T> {
        const response: T = await CrudService.create<T>(params.element, params.route);
        if (!params.element.id) {
            this.context.commit('addElement', response);
        }
        return response;
    }

    @Action
    public async deleteById(params: { id: string, route: string }): Promise<void> {
        const response: boolean = await CrudService.deleteById(params.id, params.route);
        if (response) {
            this.context.commit('removeElement', params.id);
        }
    }

    get getElements() {
        return this.elements;
    }
}