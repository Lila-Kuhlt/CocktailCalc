import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CalcService,
  EventWithRecipes,
  RecipeWithIngredients,
} from '@/controller/calc.service';
import { ApiOperation } from '@nestjs/swagger';
import { Ingredient, Recipe } from '@prisma/client';

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
  async addIngredient(@Body() data: Ingredient) {
    await this.appService.addIngredient(data.name, data.price);
  }

  @Delete('ingredient/:name')
  @ApiOperation({ summary: 'delete ingredient' })
  async deleteIngredient(@Param('name') name: string) {
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
  async addRecipe(@Body() data: Recipe) {
    await this.appService.addRecipe(data.name, data.description);
  }

  @Post('recipe/ingredient')
  @ApiOperation({ summary: 'add ingredient to recipe' })
  async addRecipeIngredient(
    @Body() data: { recipe: string; ingredient: string; amount: number },
  ) {
    await this.appService.addIngredientAmount(
      data.recipe,
      data.ingredient,
      data.amount,
    );
  }

  @Delete('recipe/:name')
  @ApiOperation({ summary: 'delete recipe' })
  async deleteRecipe(@Param('name') name: string) {
    console.log('deleting ', name);
    await this.appService.deleteRecipe(name);
  }

  // events

  @Get('events')
  @ApiOperation({ summary: 'list of all events' })
  async getEvents(): Promise<EventWithRecipes[]> {
    return await this.appService.getEvents();
  }

  @Post('event')
  @ApiOperation({ summary: 'add or update event' })
  async addEvent(@Body() data: { name: string }) {
    await this.appService.addEvent(data.name);
  }

  @Post('event/recipe')
  @ApiOperation({ summary: 'add recipe to event' })
  async addEventRecipe(
    @Body() data: { event: string; recipe: string; amount: number },
  ) {
    await this.appService.addEventRecipe(data.event, data.recipe, data.amount);
  }

  @Delete('event/:name')
  @ApiOperation({ summary: 'delete event' })
  async deleteEvent(@Param('name') name: string) {
    await this.appService.deleteEvent(name);
  }

  @Get('event/:name/list')
  @ApiOperation({ summary: 'buying list for event' })
  async getEventList(@Param('name') name: string): Promise<{ ingredients: Object, price: number }> {
    const list = await this.appService.getEventList(name);
    return { ingredients: Object.fromEntries(list.ingredients), price: list.price };
  }
}
