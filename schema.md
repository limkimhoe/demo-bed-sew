CREATE TABLE AdvertisementOptions (
	optionId BIGINT(10) NOT NULL,
    companyId BIGINT(10) NOT NULL,
    audienceCount INT(10) NOT NULL,
    cost DECIMAL(7,2) NOT NULL,
    PRIMARY KEY(optionId),
    CONSTRAINT UC_AdvertisementOption UNIQUE KEY (companyId,audienceCount,cost)
);
