package auth

import "os"

// https://cloud.google.com/appengine/docs/standard/go/runtime#environment_variables
func isRunningOnAppEngine() bool {
	// GOOGLE_CLOUD_PROJECT used also locally because of Datastore emulator
	envs := []string{
		"GAE_APPLICATION",
		"GAE_DEPLOYMENT_ID",
		"GAE_ENV",
		"GAE_INSTANCE",
		"GAE_MEMORY_MB",
		"GAE_RUNTIME",
		"GAE_SERVICE",
		"GAE_VERSION",
	}

	for _, env := range envs {
		if _, present := os.LookupEnv(env); present {
			return true
		}
	}

	return false
}
