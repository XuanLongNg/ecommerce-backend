import { Column } from 'typeorm';

export class BaseEntity {
    @Column({
        type: 'uuid',
        name: 'created_by',
    })
    createdBy: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'created_at',
    })
    createdAt: string;

    @Column({
        type: 'uuid',
        name: 'updated_by',
    })
    updatedBy: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'updated_at',
    })
    updatedAt: string;

    @Column({
        type: 'uuid',
        name: 'deleted_by',
    })
    deletedBy: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'deleted_at',
    })
    deletedAt: string;
}
