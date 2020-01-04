function createJobsFeedPageTitle(categoryName, subCategoryName) {
  if (subCategoryName) {
    return `Вакансии: ${subCategoryName} в Ташкенте на сайте jobb.uz`;
  }
  if (categoryName) {
    return `Свежие вакансии в сфере ${categoryName} в Ташкенте на сайте jobb.uz`;
  }
  return `Работа в Ташкенте - поиск работы на сайте jobb.uz`;
}

export default createJobsFeedPageTitle;
