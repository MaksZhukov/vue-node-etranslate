<template>
    <fragment>
        <vue-typed-js
            class="text-lg-center"
            :showCursor="false"
            :strings="[
                'Веб приложение предназначено для перевода текста на разные языки разными инструментами с возможностью ведения словаря',
            ]"
            :typeSpeed="20"
        >
            <h1 class="typing mb-2"></h1>
        </vue-typed-js>
        <h2 class="mb-2">
            Можете скачать
            <a
                href="https://github.com/MaksZhukov/etranslate-chrome-extension/archive/master.zip"
                download
                >ETranslate расширение</a
            >
            для браузера google chrome для удобного перевода слов со страниц
        </h2>
        <h2 class="mb-2">
            Можете скачать <a href="#">приложение ETranslate</a> на телефон для
            удобного использования переводчика с телефона
        </h2>
    </fragment>
</template>

<script>
export default {
    name: 'welcome',
};
</script>
