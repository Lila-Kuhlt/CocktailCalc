import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

/*
Note: It is important to update the prices whenever an operation may change them!
This can be done by using `updateRecipePrice` (which also updates event prices) and `updateEventPrice`.
*/

export type RecipeWithIngredients = {
  name: string;
  description: string;
  ingredients: IngredientWithAmount[];
  price: number;
};

type IngredientWithAmount = {
  name: string;
  amount: number;
};

export type EventWithRecipes = {
  name: string;
  recipes: RecipeWithAmount[];
  price: number;
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
    const ingredient = await this.prisma.ingredient.upsert({
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
      include: {
        IngredientAmount: true,
      },
    });
    for (const ingredientAmount of ingredient.IngredientAmount) {
      await this.updateRecipePrice(ingredientAmount.recipeName);
    }
  }

  async deleteIngredient(name: string) {
    const ingredient = await this.prisma.ingredient.delete({
      where: {
        name: name,
      },
      include: {
        IngredientAmount: true,
      },
    });
    for (const ingredientAmount of ingredient.IngredientAmount) {
      await this.updateRecipePrice(ingredientAmount.recipeName);
    }
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

  async addRecipe(name: string, description: string): Promise<RecipeWithIngredients> {
    return this.prisma.recipe.upsert({
      where: {
        name: name,
      },
      update: {
        description: description,
      },
      create: {
        name: name,
        description: description,
        price: 0.0,
      },
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

  async addIngredientAmount(
    recipe: string,
    ingredient: string,
    amount: number,
  ): Promise<RecipeWithIngredients> {
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
    await this.updateRecipePrice(recipe);
    return this.getRecipe(recipe);
  }

  async deleteRecipe(name: string) {
    const recipe = await this.prisma.recipe.delete({
      where: {
        name: name,
      },
      include: {
        RecipeAmount: true,
      },
    });
    for (const recipeAmount of recipe.RecipeAmount) {
      await this.updateEventPrice(recipeAmount.eventName);
    }
  }

  async deleteRecipeIngredient(recipe: string, ingredient: string): Promise<RecipeWithIngredients> {
    await this.prisma.ingredientAmount.delete({
      where: {
        recipeName_name: {
          recipeName: recipe,
          name: ingredient,
        },
      },
    });
    await this.updateRecipePrice(recipe);
    return this.getRecipe(recipe);
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

  async addEvent(name: string): Promise<EventWithRecipes> {
    return this.prisma.event.upsert({
      where: {
        name: name,
      },
      update: {},
      create: {
        name: name,
        price: 0.0,
      },
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
    await this.updateEventPrice(event);
    return this.getEvent(event);
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
    await this.updateEventPrice(event);
    return this.getEvent(event);
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
    for (const cocktail of event?.recipes ?? []) {
      const amount = cocktail.amount;
      for (const ingredient of cocktail.recipe.ingredients) {
        const oldAmount = ingredients.get(ingredient.name) ?? 0;
        const ingredientAmountInLiters = amount * ingredient.amount / 100;
        ingredients.set(ingredient.name, oldAmount + ingredientAmountInLiters);
      }
    }
    return { ingredients, price: event?.price ?? 0.0 };
  }

  private async getRecipe(name: string): Promise<RecipeWithIngredients> {
    return (await this.prisma.recipe.findUnique({
      where: {
        name: name,
      },
      include: {
        ingredients: {
          select: {
            name: true,
            amount: true,
          },
        },
      },
    }))!;
  }

  private async getEvent(name: string): Promise<EventWithRecipes> {
    return (await this.prisma.event.findUnique({
      where: {
        name: name,
      },
      include: {
        recipes: {
          select: {
            name: true,
            amount: true,
          },
        },
      },
    }))!;
  }

  private async updateRecipePrice(name: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        name: name,
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        RecipeAmount: true,
      },
    });
    let price = 0.0;
    for (const component of recipe?.ingredients ?? []) {
      price += component.amount * component.ingredient.price;
    }
    // prices are in €/l, but ingredient amounts are in cl
    await this.prisma.recipe.update({
      where: {
        name: name,
      },
      data: {
        price: price / 100,
      },
    });

    // update events
    for (const component of recipe?.RecipeAmount ?? []) {
      await this.updateEventPrice(component.eventName);
    }
  }

  private async updateEventPrice(name: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        name: name,
      },
      include: {
        recipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
    let price = 0.0;
    for (const component of event?.recipes ?? []) {
      price += component.amount * component.recipe.price;
    }
    await this.prisma.event.update({
      where: {
        name: name,
      },
      data: {
        price: price,
      },
    })
  }
}
