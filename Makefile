yarn-upgrade:
	yarn set version 3.0.0-rc.5
	yarn plugin import workspace-tools
	yarn plugin import version
	yarn plugin import stage
	yarn plugin import typescript
	yarn plugin import interactive-tools
