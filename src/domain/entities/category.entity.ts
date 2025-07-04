/**
 * 카테고리 도메인 엔티티
 * 챌린지 카테고리의 비즈니스 로직
 */
export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly iconUrl: string,
    public readonly color: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string,
    iconUrl: string,
    color: string,
  ): Category {
    return new Category(
      undefined,
      name,
      description,
      iconUrl,
      color,
      true,
      new Date(),
      new Date(),
    );
  }

  updateName(name: string): Category {
    return new Category(
      this.id,
      name,
      this.description,
      this.iconUrl,
      this.color,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  updateDescription(description: string): Category {
    return new Category(
      this.id,
      this.name,
      description,
      this.iconUrl,
      this.color,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  updateIcon(iconUrl: string): Category {
    return new Category(
      this.id,
      this.name,
      this.description,
      iconUrl,
      this.color,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  updateColor(color: string): Category {
    return new Category(
      this.id,
      this.name,
      this.description,
      this.iconUrl,
      color,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  deactivate(): Category {
    return new Category(
      this.id,
      this.name,
      this.description,
      this.iconUrl,
      this.color,
      false,
      this.createdAt,
      new Date(),
    );
  }

  activate(): Category {
    return new Category(
      this.id,
      this.name,
      this.description,
      this.iconUrl,
      this.color,
      true,
      this.createdAt,
      new Date(),
    );
  }


} 