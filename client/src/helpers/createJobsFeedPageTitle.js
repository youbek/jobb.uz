function createJobsFeedPageTitle(categoryName) {
  if (categoryName) {
    return `Свежие вакансии в сфере ${categoryName} в Ташкенте на сайте jobb.uz`;
  }
  return `Работа в Ташкенте - поиск работы на сайте jobb.uz`;
}

export default createJobsFeedPageTitle;
