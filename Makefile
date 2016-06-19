.PHONY: run
run:
	gulp

build:
	gulp production

.PHONY: clean
clean:
	rm -rf build || exit 0

.PHONY: gh-deploy
gh-deploy: build
	cd build && \
	git init && \
	git config user.email "it@kpi.pp.ua" && \
	git config user.name "IT KPI (from CI)" && \
	echo "tedx.kpi.ua" > CNAME && \
	git add . && \
	git commit -m "Deploy TEDx KPI to gh-pages" && \
	git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

.PHONY: ftp-deploy
ftp-deploy: build
	ncftpput -m -R -v -f "${CREDENTIALS}" "${FTP_DIR}" build/*

.PHONY: deploy
deploy: build
	touch "build/deployed at `date`"
	make ftp-deploy
	make gh-deploy
