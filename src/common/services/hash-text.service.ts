import bcrypt from 'bcrypt';

class HashTextService {
    private readonly saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    public async hashText(plainText: string) {
        return await bcrypt.hash(plainText, this.saltRounds);
    }

    public async compareText(plainText: string, hashText: string) {
        return await bcrypt.compare(plainText, hashText);
    }
}

const hashTextService = new HashTextService();

export { hashTextService, HashTextService };
