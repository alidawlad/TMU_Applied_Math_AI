# Unified Progress System

This document describes the consolidated progress tracking system for the TMU Applied Math Mastery AI application.

## Overview

The unified progress system consolidates multiple storage layers into a single source of truth, providing consistent data management and improved performance. This system replaces the previous fragmented approach with a clean, type-safe API.

## Architecture

### Core Components

1. **Progress Service** (`src/lib/services/progressService.ts`)
   - Singleton service that manages all progress data
   - Handles data validation, serialization, and storage
   - Provides automatic migration from legacy formats

2. **Progress Hook** (`src/lib/hooks/useProgress.ts`)
   - React hook that provides a clean API for components
   - Integrates with Firebase for optional cloud sync
   - Maintains backward compatibility with legacy methods

3. **Progress Types** (`src/lib/types/progress.ts`)
   - Comprehensive TypeScript types for all progress data
   - Union types for content-specific progress (examples vs problems)
   - Validation and migration types

4. **Achievement System** (`src/lib/utils/achievementUtils.ts`)
   - Modular achievement tracking
   - Module and lecture completion detection
   - Session storage for achievement display

## Data Structure

### Content Progress

The system tracks progress for two types of content:

#### Example Progress
```typescript
interface ExampleProgress {
  contentId: string;
  contentType: 'example';
  moduleId: string;
  lectureId: string;
  isStarted: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  lastAccessedAt: Date;
  timeSpent: number;
  sessionCount: number;
  hintsUsed: number;
  attemptsCount: number;
  revealedStepIndex: number;
  questionsAsked: number;
}
```

#### Problem Progress
```typescript
interface ProblemProgress {
  contentId: string;
  contentType: 'problem';
  moduleId: string;
  lectureId: string;
  isStarted: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  lastAccessedAt: Date;
  timeSpent: number;
  sessionCount: number;
  hintsUsed: number;
  attemptsCount: number;
  stepStatuses: Record<string, 'unanswered' | 'correct' | 'incorrect'>;
  stepInputs: Record<string, string>;
  correctStepsCount: number;
  totalSteps: number;
}
```

### Overall Statistics

```typescript
interface OverallStats {
  totalTimeSpent: number;
  completedContent: number;
  totalContent: number;
  streakDays: number;
  lastStudyDate: Date;
  completionPercentage: number;
  averageSessionTime: number;
  totalSessions: number;
}
```

## Usage

### Basic Usage

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

function MyComponent() {
  const {
    progressData,
    isLoaded,
    updateContentProgress,
    getContentProgress,
    markContentComplete,
    trackContentAccess
  } = useProgress();

  // Update progress for an example
  const updateExample = () => {
    updateContentProgress('example-1', 'example', {
      revealedStepIndex: 2,
      timeSpent: 5000,
      questionsAsked: 1
    });
  };

  // Update progress for a problem
  const updateProblem = () => {
    updateContentProgress('problem-1', 'problem', {
      stepStatuses: { 'step-1': 'correct', 'step-2': 'incorrect' },
      stepInputs: { 'step-1': 'x = 5', 'step-2': 'y = 10' },
      correctStepsCount: 1,
      totalSteps: 3,
      timeSpent: 10000
    });
  };

  return (
    <div>
      {isLoaded && (
        <p>Completion: {progressData.overallStats.completionPercentage}%</p>
      )}
    </div>
  );
}
```

### Legacy Compatibility

The system maintains backward compatibility with old APIs:

```typescript
// Legacy example methods still work
const {
  getExampleProgress,
  updateExampleProgress,
  markExampleComplete,
  incrementQuestionCount,
  updateTimeSpent
} = useProgress();

// Legacy problem methods still work
const {
  getStepStatuses,
  getStepInputs,
  getCompletedProblemIds
} = useProgress();
```

## Migration System

### Automatic Migration

The system automatically migrates data from legacy storage formats:

1. **Legacy Mastery Data** (`fm-mastery-data`) → Unified Progress
2. **Step Input Data** (`fm-stepInputs-*`) → Unified Progress  
3. **Step Status Data** (`fm-stepStatuses-*`) → Unified Progress

### Migration Status

Migration status is tracked in `fm-migration-status`:

```typescript
interface MigrationStatus {
  isCompleted: boolean;
  version: string;
  timestamp: Date;
  migratedDataSources: string[];
}
```

### Manual Migration

For advanced use cases, you can check migration status:

```typescript
import { needsMigration, getStorageUsageInfo } from '@/lib/utils/storageCleanup';

if (needsMigration()) {
  console.log('Migration needed');
}

const usage = getStorageUsageInfo();
console.log(`Deprecated storage: ${formatBytes(usage.deprecated)}`);
```

## Firebase Integration

The system includes optional Firebase integration for cloud sync:

### Configuration

Firebase integration is automatic when Firebase is configured:

```typescript
const {
  isFirebaseEnabled,
  isSyncing,
  lastSyncTime,
  syncToFirebase
} = useProgress();
```

### Sync Strategy

- **Automatic Sync**: Every 30 seconds when Firebase is enabled
- **Merge Strategy**: Prefers more recent `lastAccessedAt` timestamps
- **Conflict Resolution**: Local data takes precedence during conflicts

## Storage Management

### Storage Keys

All storage keys are defined in `STORAGE_KEYS`:

```typescript
export const STORAGE_KEYS = {
  UNIFIED_PROGRESS: 'fm-unified-progress',
  MIGRATION_STATUS: 'fm-migration-status',
  ACHIEVEMENTS: 'fm-achievements',
  
  // Legacy keys (for migration)
  MASTERY_DATA: 'fm-mastery-data',
  STEP_INPUTS_PREFIX: 'fm-stepInputs-',
  STEP_STATUSES_PREFIX: 'fm-stepStatuses-',
  OLD_MIGRATION_KEY: 'fm-progress-migrated',
} as const;
```

### Cleanup

Legacy storage keys are automatically cleaned up after migration:

```typescript
import { cleanupDeprecatedStorageKeys } from '@/lib/utils/storageCleanup';

// Manual cleanup
cleanupDeprecatedStorageKeys();
```

## Error Handling

### Validation

All input parameters are validated:

```typescript
// Invalid calls are safely ignored
updateContentProgress('', 'invalid-type', {}); // Logs error, returns safely
getContentProgress(null); // Returns null, logs error
```

### Storage Errors

Storage errors are handled gracefully:

- **Quota Exceeded**: Logged with specific error handling
- **localStorage Unavailable**: Falls back to memory-only storage
- **Invalid Data**: Resets to default state with logging

### Migration Errors

Migration errors don't break the application:

- **Parse Errors**: Individual items are skipped
- **Missing Data**: Gracefully handles missing legacy data
- **Validation Errors**: Falls back to defaults

## Performance Considerations

### Singleton Pattern

The progress service uses a singleton pattern to ensure:
- Single source of truth
- Efficient memory usage
- Consistent state across components

### Subscription Model

Components subscribe to progress changes:
- Only re-render when relevant data changes
- Efficient update propagation
- Memory leak prevention with cleanup

### Batch Operations

Firebase sync uses batch operations:
- Reduces network requests
- Handles large datasets efficiently
- Respects Firestore limits (500 operations per batch)

## Testing

### Unit Tests

Test coverage includes:
- Progress service methods
- Data validation
- Migration logic
- Error handling

### Integration Tests

Integration tests verify:
- Hook behavior
- Firebase sync
- Component integration
- Migration scenarios

## Monitoring

### Logging

The system provides comprehensive logging:
- Migration progress
- Error conditions
- Performance metrics
- Storage usage

### Metrics

Key metrics tracked:
- Completion percentages
- Session durations
- Error rates
- Storage usage

## Best Practices

### For Developers

1. **Always use the hook**: Don't access the service directly
2. **Handle loading states**: Check `isLoaded` before using data
3. **Validate inputs**: The service validates, but components should too
4. **Error boundaries**: Wrap components with error boundaries

### For Data Updates

1. **Batch updates**: Update multiple fields in a single call
2. **Provide context**: Always include `moduleId` and `lectureId`
3. **Time tracking**: Include `timeSpent` for analytics
4. **Completion logic**: Set `isCompleted` when appropriate

### For Migration

1. **Test thoroughly**: Ensure migration works with real data
2. **Backup data**: Consider data backup before migration
3. **Monitor errors**: Watch for migration-related errors
4. **Verify cleanup**: Ensure old data is properly cleaned up

## Troubleshooting

### Common Issues

1. **Data not loading**: Check browser console for storage errors
2. **Firebase sync failing**: Verify Firebase configuration
3. **Missing progress**: Check if migration completed successfully
4. **Performance issues**: Monitor storage usage and cleanup

### Debug Tools

```typescript
// Check migration status
import { getStorageUsageInfo } from '@/lib/utils/storageCleanup';
console.log(getStorageUsageInfo());

// Check progress data
const { progressData } = useProgress();
console.log(progressData);

// Force cleanup
import { cleanupDeprecatedStorageKeys } from '@/lib/utils/storageCleanup';
cleanupDeprecatedStorageKeys();
```

## Future Enhancements

### Planned Features

1. **Offline support**: Enhanced offline capability
2. **Data compression**: Reduce storage usage
3. **Analytics**: Better learning analytics
4. **Backup/restore**: Data export/import functionality

### Migration Path

The system is designed to support future migrations:
- Version tracking in data structure
- Extensible migration system
- Backward compatibility preservation

## Conclusion

The unified progress system provides a robust, scalable solution for tracking student progress in the TMU Applied Math Mastery AI application. It consolidates multiple storage layers into a clean, type-safe API while maintaining backward compatibility and providing automatic migration from legacy formats.

Key benefits:
- **Single source of truth**: Eliminates data inconsistencies
- **Type safety**: Comprehensive TypeScript coverage
- **Error resilience**: Graceful handling of edge cases
- **Performance**: Efficient storage and updates
- **Extensibility**: Easy to add new features

For questions or contributions, please refer to the codebase documentation or contact the development team.