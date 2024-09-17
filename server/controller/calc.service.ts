import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export type RecipeWithIngredients = {
  name: string;
  description: string | null;
  ingredients: IngredientWithAmount[];
};

type IngredientWithAmount = {
  name: string;
  amount: number;
};

export type EventWithRecipes = {
  name: string;
  recipes: RecipeWithAmount[];
};

type RecipeWithAmount = {
  name: string;
  amount: number;
};

@Injectable()
export class CalcService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getIngredients(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async addIngredient(name: string, price: number) {
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
    return this.prisma.recipe.findMany({
      include: {
        ingredients: {
          select: {
            name: true,
            amount: true,
          },
        },
      },
    });
  }

  async addRecipe(name: string, description: string) {
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

  async addIngredientAmount(
    recipe: string,
    ingredient: string,
    amount: number,
  ) {
    await this.prisma.ingredientAmount.upsert({
      where: {
        recipeName_name: {
          recipeName: recipe,
          name: ingredient,
        },
      },
      update: {
        amount: amount,
      },
      create: {
        recipeName: recipe,
        name: ingredient,
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

  async deleteRecipeIngredient(recipe: string, ingredient: string) {
    await this.prisma.ingredientAmount.delete({
      where: {
        recipeName_name: {
          recipeName: recipe,
          name: ingredient,
        },
      },
    });
  }

  async getEvents(): Promise<EventWithRecipes[]> {
    return this.prisma.event.findMany({
      include: {
        recipes: {
          select: {
            name: true,
            amount: true,
          },
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
        eventName_name: {
          eventName: event,
          name: recipe,
        },
      },
      update: {
        amount: amount,
      },
      create: {
        eventName: event,
        name: recipe,
        amount: amount,
      },
    });
  }

  async deleteEvent(name: string) {
    await this.prisma.event.delete({
      where: {
        name: name,
      },
    });
  }

  async deleteEventRecipe(event: string, recipe: string) {
    await this.prisma.recipeAmount.delete({
      where: {
        eventName_name: {
          eventName: event,
          name: recipe,
        },
      },
    });
  }

  async getEventList(name: string): Promise<{ ingredients: Map<string, number>, price: number }> {
    const event = await this.prisma.event.findUnique({
      where: {
        name: name,
      },
      include: {
        recipes: {
          select: {
            amount: true,
            recipe: {
              select: {
                ingredients: {
                  select: {
                    name: true,
                    amount: true,
                    ingredient: {
                      select: {
                        price: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    let ingredients = new Map();
    let price = 0.0;
    for (const cocktail of event?.recipes ?? []) {
      const amount = cocktail.amount;
      for (const ingredient of cocktail.recipe.ingredients) {
        const oldAmount = ingredients.get(ingredient.name) ?? 0;
        const ingredientAmountInLiters = amount * ingredient.amount / 100;
        ingredients.set(ingredient.name, oldAmount + ingredientAmountInLiters);
        // prices are in €/l, but ingredient amounts are in cl
        price += ingredientAmountInLiters * ingredient.ingredient.price;
      }
    }
    return { ingredients, price };
  }
}
