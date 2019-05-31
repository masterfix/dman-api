import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'uniqueEntity', async: true })
export class UniqueEntityConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments | undefined,
  ): boolean | Promise<boolean> {
    if (
      !validationArguments ||
      !validationArguments.constraints ||
      !validationArguments.constraints[0]
    ) {
      throw new Error('constraint not configured correctly');
    }
    const entity = validationArguments.constraints[0];
    const field: string = validationArguments.property;
    return this.entityManager
      .count(entity, { [field]: value })
      .then(count => count === 0);
  }

  defaultMessage(): string {
    return 'value already exists';
  }
}

export function UniqueEntity(
  entityClass: any,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: UniqueEntityConstraint,
    });
  };
}
