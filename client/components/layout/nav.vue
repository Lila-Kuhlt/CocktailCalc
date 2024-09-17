<template>
  <header>
    <nav>
      <div
        class="flex items-center justify-between bg-primary-400 p-5 dark:bg-primary-500"
      >
        <a class="text-3xl font-bold" href="/">CocktailCalc</a>

        <ul class="flex items-center space-x-5 text-xl font-semibold">
          <li class="list-item"><a href="/">Events</a></li>
          <li class="list-item"><a href="/recipes">Rezepte</a></li>
          <li class="list-item"><a href="/ingredients">Zutaten</a></li>
          <li>
            <SettingTheme />
          </li>
        </ul>
      </div>
      <div class="h-1 bg-primary-500 px-1 dark:bg-primary-400" />
    </nav>
  </header>
</template>
