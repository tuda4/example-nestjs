import { Task } from "../tasks.entity";

export class ResponsespPanigation {
    page: number;
    page_size: number;
    total: number;
    data: Task[];
}