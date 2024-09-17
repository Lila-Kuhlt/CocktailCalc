import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CalcService,
  EventWithRecipes,
  RecipeWithIngredients,
} from '@/controller/calc.service';
import { Ingredient, Recipe } from '@prisma/client';

@Controller('/')
export class CalcController {
  constructor(private readonly appService: CalcService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ingredients

  @Get('ingredients')
  async getIngredients(): Promise<Ingredient[]> {
    return await this.appService.getIngredients();
  }

  @Post('ingredient')
  async addIngredient(@Body() data: Ingredient) {
    await this.appService.addIngredient(data.name, data.price);
  }

  @Delete('ingredient/:name')
  async deleteIngredient(@Param('name') name: string) {
    await this.appService.deleteIngredient(name);
  }

  // recipes

  @Get('recipes')
  async getRecipes(): Promise<RecipeWithIngredients[]> {
    return await this.appService.getRecipes();
  }

  @Post('recipe')
  async addRecipe(@Body() data: Recipe) {
    await this.appService.addRecipe(data.name, data.description);
  }

  @Post('recipe/ingredient')
  async addRrecipeIngredient(
    @Body() data: { recipe: string; ingredient: string; amount: number },
  ) {
    await this.appService.addIngredientAmount(
      data.recipe,
      data.ingredient,
      data.amount,
    );
  }

  @Delete('recipe/:name')
  async deleteRecipe(@Param('name') name: string) {
    console.log('deleting ', name);
    await this.appService.deleteRecipe(name);
  }

  // events

  @Get('events')
  async getEvents(): Promise<EventWithRecipes[]> {
    return await this.appService.getEvents();
  }

  @Post('event')
  async addEvent(@Body() data: { name: string }) {
    await this.appService.addEvent(data.name);
  }

  @Post('event/recipe')
  async addEventRecipe(
    @Body() data: { event: string; recipe: string; amount: number },
  ) {
    await this.appService.addEventRecipe(data.event, data.recipe, data.amount);
  }

  @Delete('event/:name')
  async deleteEvent(@Param('name') name: string) {
    await this.appService.deleteEvent(name);
  }

  @Get('event/:name/list')
  async getEventList(@Param('name') name: string): Promise<Object> {
    const ingredients = await this.appService.getEventList(name);
    return Object.fromEntries(ingredients);
  }
}
