import type { SurveyDBData } from '@/types';
import { db } from './db';

// 添加数据
export async function saveSurvey(data: SurveyDBData) {
  return await db.surveys.add(data);
}

// 查询所有数据
export async function getAllSurvey() {
  return await db.surveys.toArray();
}

// 获取单个数据
export async function getSurveyById(id: number) {
  const survey = await db.surveys.get(id);
  return survey;
}

// 更新数据
export async function updateSurvey(id: number, data: Partial<SurveyDBData>) {
  await db.surveys.update(id, data);
}

// 删除数据
export async function deleteSurvey(id: number) {
  return await db.surveys.delete(id);
}
