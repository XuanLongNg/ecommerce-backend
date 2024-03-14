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
        default: new Date().getTime().toString(),
    })
    createdAt: string;

    @Column({
        type: 'uuid',
        name: 'updated_by',
        nullable: true,
    })
    updatedBy: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'updated_at',
        nullable: true,
        default: new Date().getTime().toString(),
    })
    updatedAt: string;

    @Column({
        type: 'uuid',
        name: 'deleted_by',
        nullable: true,
    })
    deletedBy: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'deleted_at',
        nullable: true,
    })
    deletedAt: string;
}
