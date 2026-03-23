import axios from 'axios';
import type { ContactForm, PortfolioData, Project } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchPortfolioData = () =>
  client.get<PortfolioData>('/portfolio/');

export const fetchProjects = () =>
  client.get<Project[]>('/projects/');

export const fetchProjectBySlug = (slug: string) =>
  client.get<Project>(`/projects/${slug}/`);

export const submitContact = (data: ContactForm) =>
  client.post('/contact/', data);
