class ResultException {
    public status: number;
    public message: string | null;
    public result: any;

    constructor(status: number, message: string | null, result: any) {
        this.status = status;
        this.message = message;
        this.result = result;

        return this;
    }
}

export default ResultException;
