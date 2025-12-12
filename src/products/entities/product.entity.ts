import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;


  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;


  @Column({
    type: 'numeric',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number


  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  slug: string;


  @Column({
    type: 'numeric',
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  stock: number;


  @BeforeInsert()
  checkSlugInsert(){

      if (!this.slug){
          this.slug = this.name;
      }

      this.slug = this.slug
          .toLowerCase()
          .replaceAll(' ', '_')
          .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate(){
      this.slug = this.slug
          .toLowerCase()
          .replaceAll(' ', '_')
          .replaceAll("'", '');

  }

}