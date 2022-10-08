ci-full: ci

upload-climate:
	cc-test-reporter format-coverage -t lcov -o $(TARGET_PATH)/coverage/codeclimate.json -p $(ROOT_PATH) $(TARGET_PATH)/coverage/lcov.info
	cc-test-reporter upload-coverage --debug -i $(TARGET_PATH)/coverage/codeclimate.json -r "$(shell echo "${CODECLIMATE_SECRET}" | base64 -d)"
