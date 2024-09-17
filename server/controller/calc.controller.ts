import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CalcService,
  EventWithRecipes,
  RecipeWithIngredients,
} from '@/controller/calc.service';
import { ApiOperation, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ingredient, Recipe } from '@prisma/client';

class IngredientDto {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  price!: number;
}

class RecipeDto {
  @ApiProperty()
  name!: string;
  @ApiPropertyOptional()
  description?: string;
}

class RecipeIngredientDto {
  @ApiProperty()
  recipe!: string;
  @ApiProperty()
  ingredient!: string;
  @ApiProperty()
  amount!: number;
}

class DeleteRecipeIngredientDto {
  @ApiProperty()
  recipe!: string;
  @ApiProperty()
  ingredient!: string;
}

class EventRecipeDto {
  @ApiProperty()
  event!: string;
  @ApiProperty()
  recipe!: string;
  @ApiProperty()
  amount!: number;
}

class DeleteEventRecipeDto {
  @ApiProperty()
  event!: string;
  @ApiProperty()
  recipe!: string;
}

@Controller('/')
export class CalcController {
  constructor(private readonly appService: CalcService) {}

  @Get()
  @ApiOperation({ summary: 'Hello world' })
  getHello(): string {
    return this.appService.getHello();
  }

  // ingredients

  @Get('ingredients')
  @ApiOperation({ summary: 'list of all ingredients' })
  async getIngredients(): Promise<Ingredient[]> {
    return await this.appService.getIngredients();
  }

  @Post('ingredient')
  @ApiOperation({ summary: 'add or update ingredient' })
  async addIngredient(@Body() data: IngredientDto) {
    await this.appService.addIngredient(data.name, data.price);
  }

  @Delete('ingredient')
  @ApiOperation({ summary: 'delete ingredient' })
  async deleteIngredient(@Body() name: string) {
    await this.appService.deleteIngredient(name);
  }

  // recipes

  @Get('recipes')
  @ApiOperation({ summary: 'list of all recipes' })
  async getRecipes(): Promise<RecipeWithIngredients[]> {
    return await this.appService.getRecipes();
  }

  @Post('recipe')
  @ApiOperation({ summary: 'add or update recipe' })
  async addRecipe(@Body() data: RecipeDto) {
    await this.appService.addRecipe(data.name, data.description ?? "");
  }

  @Post('recipe/ingredient')
  @ApiOperation({ summary: 'add ingredient to recipe' })
  async addRecipeIngredient(@Body() data: RecipeIngredientDto) {
    await this.appService.addIngredientAmount(
      data.recipe,
      data.ingredient,
      data.amount,
    );
  }

  @Delete('recipe')
  @ApiOperation({ summary: 'delete recipe' })
  async deleteRecipe(@Body() name: string) {
    await this.appService.deleteRecipe(name);
  }

  @Delete('recipe/ingredient')
  @ApiOperation({ summary: 'delete ingredient from recipe' })
  async deleteRecipeIngredient(@Body() data: DeleteRecipeIngredientDto) {
    await this.appService.deleteRecipeIngredient(data.recipe, data.ingredient);
  }

  // events

  @Get('events')
  @ApiOperation({ summary: 'list of all events' })
  async getEvents(): Promise<EventWithRecipes[]> {
    return await this.appService.getEvents();
  }

  @Post('event')
  @ApiOperation({ summary: 'add or update event' })
  async addEvent(@Body() name: string) {
    await this.appService.addEvent(name);
  }

  @Post('event/recipe')
  @ApiOperation({ summary: 'add recipe to event' })
  async addEventRecipe(@Body() data: EventRecipeDto) {
    await this.appService.addEventRecipe(data.event, data.recipe, data.amount);
  }

  @Delete('event')
  @ApiOperation({ summary: 'delete event' })
  async deleteEvent(@Body() name: string) {
    await this.appService.deleteEvent(name);
  }

  @Delete('event/recipe')
  @ApiOperation({ summary: 'delete recipe from event' })
  async deleteEventRecipe(@Body() data: DeleteEventRecipeDto) {
    await this.appService.deleteEventRecipe(data.event, data.recipe);
  }

  @Get('event/list')
  @ApiOperation({ summary: 'buying list for event' })
  async getEventList(@Body() name: string): Promise<{ ingredients: Object, price: number }> {
    const list = await this.appService.getEventList(name);
    return { ingredients: Object.fromEntries(list.ingredients), price: list.price };
  }
}
