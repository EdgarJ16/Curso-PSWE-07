import './ui/styles.css';
import { TaskService } from './logic/task-service';
import { LocalStorageStore } from './persistence/local-storage-store';
import { createApp } from './ui/app';

createApp(document.getElementById('app')!, new TaskService(new LocalStorageStore()));
