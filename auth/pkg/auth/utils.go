package auth

import "os"

// https://cloud.google.com/run/docs/container-contract#services-env-vars
func isRunningOnCloudRun() bool {
	// GOOGLE_CLOUD_PROJECT used also locally because of Datastore emulator
	envs := []string{
		"K_SERVICE",
		"K_REVISION",
		"K_CONFIGURATION",
		"PORT",
	}

	for _, env := range envs {
		if _, present := os.LookupEnv(env); present {
			return true
		}
	}

	return false
}
