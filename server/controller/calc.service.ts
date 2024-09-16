import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export type RecipeWithIngredients = {
  name: string;
  description: string | null;
  ingredients: IngredientWithAmount[];
}

type IngredientWithAmount = {
  ingredientName: string;
  amount: number;
}

export type EventWithRecipes = {
  name: string;
  recipes: RecipeWithAmount[];
}

type RecipeWithAmount = {
  recipeName: string;
  amount: number;
}

@Injectable()
export class CalcService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getIngredients(): Promise<Ingredient[]> {
    return await this.prisma.ingredient.findMany();
  }

  async addIngredient(name: string, price: number) {
    console.log(name, price)
    await this.prisma.ingredient.upsert({
      where: {
        name: name,
      },
      update: {
        price: price,
      },
      create: {
        name: name,
        price: price,
      },
    });
  }

  async deleteIngredient(name: string) {
    await this.prisma.ingredient.delete({
      where: {
        name: name,
      },
    });
  }

  async getRecipes(): Promise<RecipeWithIngredients[]> {
    return await this.prisma.recipe.findMany({
      include: {
        ingredients: {
          select: {
            ingredientName: true,
            amount: true,
          },
        },
      },
    });
  }

  async addRecipe(name: string, description: string | null) {
    await this.prisma.recipe.upsert({
      where: {
        name: name,
      },
      update: {
        description: description,
      },
      create: {
        name: name,
        description: description,
      },
    });
  }

  async addIngredientAmount(recipe: string, ingredient: string, amount: number) {
    await this.prisma.ingredientAmount.upsert({
      where: {
        recipeName_ingredientName: {
          recipeName: recipe,
          ingredientName: ingredient,
        },
      },
      update: {
        amount: amount,
      },
      create: {
        recipeName: recipe,
        ingredientName: ingredient,
        amount: amount,
      },
    });
  }

  async deleteRecipe(name: string) {
    await this.prisma.recipe.delete({
      where: {
        name: name,
      },
    });
  }

  async getEvents(): Promise<EventWithRecipes[]> {
    return await this.prisma.event.findMany({
      include: {
        recipes: {
          select: {
            recipeName: true,
            amount: true,
          }
        },
      },
    });
  }

  async addEvent(name: string) {
    await this.prisma.event.upsert({
      where: {
        name: name,
      },
      update: {},
      create: {
        name: name,
      },
    });
  }

  async addEventRecipe(event: string, recipe: string, amount: number) {
    await this.prisma.recipeAmount.upsert({
      where: {
        eventName_recipeName: {
          eventName: event,
          recipeName: recipe,
        },
      },
      update: {
        amount: amount,
      },
      create: {
        eventName: event,
        recipeName: recipe,
        amount: amount,
      },
    });
  }
}
